#frozen_string_literal: true
require 'net/http'
require 'json'

module Attractions
    class AttractionsController < ApplicationController
        API_URL = 'https://app.ticketmaster.com/discovery/v2/attractions?apikey=wLgHQPykAmoMGU0dewGEsgTr5vZj3jMX'
        def show
        
        end

        def fetch_data
            country_code = params[:countryCode] || 'US'
            uri = URI.parse("#{API_URL}&countryCode=#{URI.encode_www_form_component(country_code)}")
            response = Net::HTTP.get(uri)
        
            data = JSON.parse(response)
    
            attractions = data.dig('_embedded', 'attractions')&.map do |attraction|
                largest_image = attraction['images']&.max_by { |img| img['width'] * img['height'] }
                    {
                    name: attraction['name'],
                    id: attraction['id'],
                    url: attraction['url'],
                    segment: attraction.dig('classifications', 0, 'segment', 'name'),
                    genre: attraction.dig('classifications', 0, 'genre', 'name'),
                    image: largest_image ? largest_image['url'] : nil,
                    isFavorite: false
                    }
        end
            render json: { attractions: attractions }
        rescue StandardError => e
            render json: { error: e.message }, status: :bad_request
        end
    end
end