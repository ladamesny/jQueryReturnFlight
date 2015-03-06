Rails.application.routes.draw do
  resources :flights, only: [:index]
  root "flights#index"
end
