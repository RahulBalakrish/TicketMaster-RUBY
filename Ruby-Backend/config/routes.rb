Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get 'up' => 'rails/health#show', as: :rails_health_check
  # Defines the root path route ("/")
  namespace :events do
    get 'fetch_data', to: 'events#fetch_data'
  end
  namespace :attractions do
    get 'fetch_data', to: 'attractions#fetch_data'
  end
  namespace :suggestions do
    get 'fetch_data', to: 'suggest#fetch_data'
  end
  namespace :venues do
    get 'fetch_data', to: 'venue#fetch_data'
  end

  namespace :customer do
    post 'register', to: 'customer#register'
    post 'login', to: 'customer#login'
    post 'subscription', to: 'customer#subscription'
    post 'checkout', to: 'customer#create_checkout_session'
    post 'favorites', to: 'customer#make_favorites'
    post 'getFavorites', to: 'customer#get_favorites'
    post 'create_tickets', to: 'customer#create_bought_tickets'
    post 'tickets', to: 'customer#get_bought_tickets'
    post 'removeFavorites', to: 'customer#remove_favorites'
    post 'userSessionLogin', to: 'customer#user_session_login'
  end

  namespace :payments do
    post 'create_checkout_session', to: 'payments#create_checkout_session'
    post 'create_subscription_session', to: 'payments#create_subscription_session'
  end
  # root "posts#index"
end
