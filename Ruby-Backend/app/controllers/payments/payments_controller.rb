# frozen_string_literal: true

class Payments::PaymentsController < ApplicationController
  # Disable CSRF protection for API calls (especially useful for JSON-based APIs)
  skip_before_action :verify_authenticity_token, only: %i[create_checkout_session create_subscription_session]

  include Payments::StripeHelper
  include Customer::CustomerHelper

  def create_checkout_session
    Rails.logger.info("Creating checkout session for amount: #{params[:amount]} and email: #{params[:email]}")
    session = checkout_session(params[:amount], params[:email], params[:token], params[:orderId])
    created_bought = create_bought(params[:email], params[:event])
    render json: { id: session.id,
                   url: session.url, bought: created_bought }, status: :ok
  rescue Stripe::StripeError => e
    render json: { error: e.message }, status: :unprocessable_entity
  end

  def create_subscription_session
    Rails.logger.info("Creating subscribe session for amount: #{params[:amount]} and email: #{params[:email]}")
    session = subscribe_session(params[:amount], params[:email], params[:token])
    sub = isSubscribed(params[:email])
    render json: { id: session.id,
                   url: session.url }, status: :ok
  rescue Stripe::StripeError => e
    render json: { error: e.message }, status: :unprocessable_entity
  end
end
