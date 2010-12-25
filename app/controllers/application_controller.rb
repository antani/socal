class ApplicationController < ActionController::Base
  protect_from_forgery
  before_filter :set_user_time_zone


  def show
    @user = current_user
    @microposts = @user.calendars.paginate(:page => params[:page])
    @title = @user.name
  end

  def client
   Twitter.configure do |config|
      config.consumer_key = 'vm1CDPRNqXHXseMnUKHxDA'
      config.consumer_secret = 'O08Pt86u7n8mNhWdT78ODCAxm8UJjEJEyOkF6rPho'
      config.oauth_token = session['access_token']
      config.oauth_token_secret = session['access_secret']
    end
    @client ||= Twitter::Client.new

 end




  private

  def set_user_time_zone
    logger.debug 'User timezone-----' || current_user.timezone
    Time.zone = current_user.timezone if user_signed_in?

  end

end

