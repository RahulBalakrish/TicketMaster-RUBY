# Helper class to interact with Stripe API
module Payments::StripeHelper
  def initialize; end

  def checkout_session(amount, email, token, _orderId, currency = 'usd')
    success_redirect_url = "http://localhost:3000/success?token=#{token}"
    cancel_redirect_url = "http://localhost:3000/cancel?token=#{token}&orderId=#{_orderId}"
    pre_customer_email = email || 'default@example.com'
    Stripe::Checkout::Session.create({
                                       payment_method_types: ['card'],
                                       line_items: [{
                                         price_data: {
                                           currency:,
                                           product_data: {
                                             name: 'Ticket Purchase'
                                           },
                                           unit_amount: amount
                                         },
                                         quantity: 1
                                       }],
                                       mode: 'payment',
                                       customer_email: pre_customer_email,
                                       success_url: success_redirect_url,
                                       cancel_url: cancel_redirect_url
                                     })
  end

  def subscribe_session(amount, email, token, currency = 'usd')
    success_redirect_url = "http://localhost:3000/success?token=#{token}"
    cancel_redirect_url = "http://localhost:3000/cancel?token=#{token}"
    pre_customer_email = email || 'default@example.com'
    Stripe::Checkout::Session.create({
                                       payment_method_types: ['card'],
                                       line_items: [{
                                         price_data: {
                                           currency:,
                                           product_data: {
                                             name: 'Ticket Purchase'
                                           },
                                           unit_amount: amount
                                         },
                                         quantity: 1
                                       }],
                                       mode: 'payment',
                                       customer_email: pre_customer_email,
                                       success_url: success_redirect_url,
                                       cancel_url: cancel_redirect_url
                                     })
  end

  def create_customer
    Stripe::Customer.create({
                              email: @user.email,
                              name: @user.name
                            })
  end
end
