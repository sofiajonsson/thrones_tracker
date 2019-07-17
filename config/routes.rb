Rails.application.routes.draw do
  resources :posts
  resources :comments
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  namespace :api do
        resources :posts, only: [:index, :update, :create, :destroy]
        resources :comments, only: [:index, :update, :create, :destroy]
    end
end
