Rails.application.routes.draw do
  resources :flights, only: [:index, :new, :create] do
    collection do
      get "book"
    end
    collection do
      get "favorite"
    end
    collection do
      get "status"
    end
  end
  root "flights#index"
end
