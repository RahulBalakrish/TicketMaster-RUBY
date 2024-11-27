# frozen_string_literal: true

require 'securerandom'

module Customer
  class CustomerController < ApplicationController
    skip_before_action :verify_authenticity_token
    def register
      # Logic for customer registration
      @user = TUser.new(user_params)
      @user.login_token = SecureRandom.uuid
      if @user.save
        created_user = @user
        render json: { message: 'Successfully registered!',
                       user: created_user }, status: :created
      else
        render json: { errors: @user.errors.full_messages }, status: :unprocessable_entity
      end
    end

    def login
      user = TUser.find_by(email: params[:email])

      if user && user.authenticate(params[:password])
        loggedInUser = user
        render json: { message: 'Login successful!',
                       user: loggedInUser }, status: :ok
      else
        render json: { error: 'Invalid email or password' }, status: :unauthorized
      end
    end

    def subscription
      user = TUser.find_by(email: params[:email])
      if user
        subscribed_user = user.update(isSubscribed: true)
        render json: { message: 'Subscription successful!',
                       user: subscribed_user }, status: :ok
      else
        render json: { error: 'User not found' }, status: :not_found
      end
    end

    def make_favorites
      user = TUser.find_by(email: params[:email])
      if user
        favorite = user.favorites.first_or_create
        if params[:events]
          favorite.events ||= []

          # Ensure the event is only added if the ID does not already exist
          event_id = params[:order_id]
          favorite.events << params[:events] unless favorite.events.any? { |event| event['id'] == event_id }
        end

        if params[:attractions]
          favorite.attractions ||= []

          # Ensure the attraction is only added if the ID does not already exist
          attraction_id = params[:order_id]
          unless favorite.attractions.any? { |attraction| attraction['id'] == attraction_id }
            favorite.attractions << params[:attractions]
          end
        end
        if favorite.save
          updated_user = TUser.find_by(email: params[:email])
          render json: { message: 'Favorite updated successfully!',
                         user: updated_user }, status: :ok
        else
          render json: { error: favorite.errors.full_messages }, status: :unprocessable_entity
        end
      else
        render json: { error: 'User not found' }, status: :not_found
      end
    end

    def get_favorites
      user = TUser.find_by(email: params[:email])
      if user
        user_favorites = user.favorites[0]
        render json: { favorites: user_favorites }, status: :ok
      else
        render json: { error: 'User not found' }, status: :not_found
      end
    end

    def remove_favorites
      Rails.logger.info("Removing favorite for #{params} user: #{params[:email]}, event: #{params[:remove_event_id]}, attraction: #{params[:remove_attraction_id]}")
      user = TUser.find_by(email: params[:email])
      if user
        favorite = user.favorites.first_or_create
        if params[:remove_event_id]
          favorite.events ||= []
          favorite.events.reject! { |e| e['id'] == params[:remove_event_id] }
        end

        # Remove an attraction by ID
        if params[:remove_attraction_id]
          favorite.attractions ||= []
          favorite.attractions.reject! { |a| a['id'] == params[:remove_attraction_id] }
        end

        # Save the updated favorite
        if favorite.save
          updated_fav = user.favorites[0]
          render json: { message: 'Favorite updated successfully!',
                         favorites: updated_fav }, status: :ok
        else
          render json: { error: favorite.errors.full_messages }, status: :unprocessable_entity
        end
      else
        render json: { error: 'User not found' }, status: :not_found
      end
    end

    def user_session_login
      logged_user = TUser.find_by(login_token: params[:token])
      if logged_user
        if params[:cancel && params[:remove_event_id]]
          cancelledOrder = logged_user.boughts[0]
          Rails.logger.info("Removing event for user: #{params[:email]}, event: #{params[:remove_event_id]}")
          Rails.logger.info("Cancelled order: #{cancelledOrder}")
          Rails.logger.info("Events: #{cancelledOrder.events}")
          cancelledOrder.events.reject! { |e| e['id'] == params[:remove_event_id] }
          if cancelledOrder.save
            updated_order = logged_user.boughts[0]
            render json: { message: 'Order updated successfully!',
                           order: updated_order,
                           user: logged_user }, status: :ok
          else
            render json: { error: cancelledOrder.errors.full_messages }, status: :unprocessable_entity
          end
        else
          render json: { message: 'User found!', user: logged_user }, status: :ok
        end
      else
        render json: { error: 'User session not found' }, status: :not_found
      end
    end

    def create_bought_tickets
      user = TUser.find_by(email: params[:email])
      if user
        bought = user.boughts.first_or_create
        if params[:event]
          bought.events ||= []
          bought.events << params[:event]
        end
        if bought.save
          render json: { message: 'Tickets saved!' }, status: :ok
        else
          render json: { error: bought.errors.full_messages }, status: :unprocessable_entity
        end
      else
        render json: { error: 'User not found' }, status: :not_found
      end
    end

    def get_bought_tickets
      user = TUser.find_by(email: params[:email])
      if user
        user_bought = user.boughts[0]
        render json: { Tickets: user_bought }, status: :ok
      else
        render json: { error: 'User not found' }, status: :not_found
      end
    end

    private

    def user_params
      params.require(:t_users).permit(:email, :password, :username)
    end
  end
end
