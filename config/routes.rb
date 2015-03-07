Rails.application.routes.draw do
  resources :flights, only: [:index, :new, :create] do
    collection do
      get "book"
    end
  end
  root "flights#index"
end
