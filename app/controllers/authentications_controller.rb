require 'multi_json'

class AuthenticationsController < ApplicationController
  def index
     @authentications = current_user.authentications if current_user
  end

  def create
      omniauth = request.env["omniauth.auth"]
      logger.debug omniauth.to_yaml
      authentication = Authentication.find_by_provider_and_uid(omniauth['provider'], omniauth['uid'])
      if authentication
        #flash[:notice] = "Signed in successfully."
        sign_in_and_redirect(:user, authentication.user)
      elsif current_user
        current_user.authentications.create!(:provider => omniauth['provider'],
                                             :uid => omniauth['uid'],
                                             :token => omniauth['credentials']['token'],
                                             :secret => omniauth['credentials']['secret'])
        #flash[:notice] = "Authentication successful."
        redirect_to authentications_url
      else
        user = User.new
        user.apply_omniauth(omniauth)
        if user.save
          #flash[:notice] = "Signed in successfully."
          sign_in_and_redirect(:user, user)
        else
          session[:omniauth] = omniauth.except('extra')
          redirect_to new_user_registration_url
        end
      end
  end

  def client
    Twitter.configure do |config|
      config.consumer_key = 'vm1CDPRNqXHXseMnUKHxDA'
      config.consumer_secret = 'O08Pt86u7n8mNhWdT78ODCAxm8UJjEJEyOkF6rPho'
      config.oauth_token = @oauth_token
      config.oauth_token_secret = @oauth_token_secret
    end
    @client ||= Twitter::Client.new
  end


  def destroy
     @authentication = current_user.authentications.find(params[:id])
     @authentication.destroy
     #flash[:notice] = "Successfully destroyed authentication."
     redirect_to authentications_url
  end
end

