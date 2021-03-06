Socal::Application.routes.draw do

  resources :categories

  get "settings/home"
  resources :authentications
  resources :calendars
  resources :settings, :only => [:create, :edit, :update]
  resources :g_data

  resources :calendars do
      get 'toggle_done', :on => :member
      get 'note_add', :on => :member
      get 'up_priority', :on => :member
      get 'down_priority', :on => :member

  end
  resources :settings do
	get 'update_other_settings', :on => :member
  end		


#  match :google_calendar_noise => "calendars#google_calendar_noise"

  #, :only => [:create, :destroy, :edit, :update]
  #, :only => [:create, :destroy, :edit]


  #devise_for :users, :path_names => { :sign_up => "register" }
  devise_for :users, :controllers => {:registrations => 'registrations'}



  match '/auth/:provider/callback' => 'authentications#create'
  match '/contact', :to => 'pages#contact'
  match '/about',   :to => 'pages#about'
  match '/help',    :to => 'pages#help'




  # The priority is based upon order of creation:
  # first created -> highest priority.

  # Sample of regular route:
  #   match 'products/:id' => 'catalog#view'
  # Keep in mind you can assign values other than :controller and :action

  # Sample of named route:
  #   match 'products/:id/purchase' => 'catalog#purchase', :as => :purchase
  # This route can be invoked with purchase_url(:id => product.id)

  # Sample resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Sample resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Sample resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Sample resource route with more complex sub-resources
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', :on => :collection
  #     end
  #   end

  # Sample resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end

  # You can have the root of your site routed with "root"
  # just remember to delete public/index.html.
   root :to => "pages#home"

  # See how all your routes lay out with "rake routes"

  # This is a legacy wild controller route that's not recommended for RESTful applications.
  # Note: This route will make all actions in every controller accessible via GET requests.
  # match ':controller(/:action(/:id(.:format)))'
end

