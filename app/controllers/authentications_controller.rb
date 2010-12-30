require 'multi_json'

class AuthenticationsController < ApplicationController
  def index
     @authentications = current_user.authentications if current_user
  end

  def create
      omniauth = request.env["omniauth.auth"]
      logger.debug omniauth.to_yaml
      logger.debug "----------------------------------------------------------------"
      logger.debug current_user.inspect
      logger.debug "----------------------------------------------------------------"

      authentication = Authentication.find_by_provider_and_uid(omniauth['provider'], omniauth['uid'])
      user = User.find_by_email(omniauth['user_info']['email'])

      #Condition 1 : If authentication is found with current provider and UID, simply signin the user.
      if authentication
        sign_in_and_redirect(:user, authentication.user)
      #Condition 2 : If there is a user with the email id associated with this authentication,
      #just create the authentication and sign her in
      elsif user
            provider = omniauth['provider']
            if (provider=='twitter' or provider=='facebook' or provider=='foursquare')
                  user.authentications.create!(:provider => omniauth['provider'],
                                               :uid => omniauth['uid'],
                                               :token => omniauth['credentials']['token'],
                                               :secret => omniauth['credentials']['secret'])
           else
                  user.authentications.create!(:provider => omniauth['provider'],
                                               :uid => omniauth['uid'])
           end
           sign_in_and_redirect(:user, user)
      #Condition 3 : If the authentication is same as the current user
      elsif current_user
        provider = omniauth['provider']
        if (provider=='twitter' or provider=='facebook' or provider=='foursquare')
              current_user.authentications.create!(:provider => omniauth['provider'],
                                                   :uid => omniauth['uid'],
                                                   :token => omniauth['credentials']['token'],
                                                   :secret => omniauth['credentials']['secret'])
       else
              current_user.authentications.create!(:provider => omniauth['provider'],
                                                   :uid => omniauth['uid'])
       end
        redirect_to authentications_url
      else
        #Condition : 4, This is a new user
        user = User.new
        user.apply_omniauth(omniauth)
        if user.save
          flash[:notice] = "Signed in successfully."
          sign_in_and_redirect(:user, user)
        else
          flash[:notice] = "Signed up successfully."
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

