# frozen_string_literal: true
require 'net/http'
require 'json'
require 'uri'

module Suggestions
  class SuggestController < ApplicationController
    API_URL = 'https://app.ticketmaster.com/discovery/v2/suggest?apikey=wLgHQPykAmoMGU0dewGEsgTr5vZj3jMX'

    def show
      # Implement show action if needed
    end

    def fetch_data
      country_code = params[:countryCode] || 'US'
      Rails.logger.info("Country Code: #{country_code}")

      # Construct the URI with parameters
      uri = URI.parse("#{API_URL}&countryCode=#{URI.encode_www_form_component(country_code)}")
      
      response = Net::HTTP.get_response(uri)
      
      if response.is_a?(Net::HTTPSuccess)
        data = JSON.parse(response.body)

        # Process events
        events = data.dig('_embedded', 'events')&.map do |event|
          largest_image = event['images']&.max_by { |img| img['width'] * img['height'] }

          {
            name: event['name'],
            id: event['id'],
            url: event['url'],
            segment: event.dig('classifications', 0, 'segment', 'name'),
            genre: event.dig('classifications', 0, 'genre', 'name'),
            image: largest_image ? largest_image['url'] : nil
          }
        end

        # Process attractions
        attractions = data.dig('_embedded', 'attractions')&.map do |attraction|
          largest_image = attraction['images']&.max_by { |img| img['width'] * img['height'] }

          {
            name: attraction['name'],
            id: attraction['id'],
            url: attraction['url'],
            segment: attraction.dig('classifications', 0, 'segment', 'name'),
            genre: attraction.dig('classifications', 0, 'genre', 'name'),
            image: largest_image ? largest_image['url'] : nil
          }
        end

        # Return the customized JSON with separate event and attraction arrays under suggest
        render json: { suggest: { events: events, attractions: attractions } }
      else
        render json: { error: 'Unable to fetch data from Ticketmaster' }, status: :bad_request
      end
    rescue StandardError => e
      render json: { error: e.message }, status: :bad_request
    end
  end
end
