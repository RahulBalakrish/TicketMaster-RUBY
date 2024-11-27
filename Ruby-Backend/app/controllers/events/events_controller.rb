# frozen_string_literal: true

require 'net/http'
require 'json'

module Events
  class EventsController < ApplicationController
    API_URL = 'https://app.ticketmaster.com/discovery/v2/events?apikey=wLgHQPykAmoMGU0dewGEsgTr5vZj3jMX'
    def show; end

    def fetch_data
      country_code = params[:countryCode] || 'US'
      uri = URI.parse("#{API_URL}&countryCode=#{URI.encode_www_form_component(country_code)}")
      response = Net::HTTP.get(uri)
      data = JSON.parse(response)

      events = data.dig('_embedded', 'events')&.map do |event|
        largest_image = event['images']&.max_by { |img| img['width'] * img['height'] }

        {
          name: event['name'],
          id: event['id'],
          url: event['url'],
          segment: event.dig('classifications', 0, 'segment', 'name'),
          genre: event.dig('classifications', 0, 'genre', 'name'),
          image: largest_image ? largest_image['url'] : nil,
          isFavorite: false
        }
      end
      render json: { events: }
    rescue StandardError => e
      render json: { error: e.message }, status: :bad_request
    end
  end
end
