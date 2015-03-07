Rails.application.routes.draw do
  resources :flights, only: [:index, :new, :create]
  root "flights#index"
end
