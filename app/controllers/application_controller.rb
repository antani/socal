class ApplicationController < ActionController::Base
  protect_from_forgery
  before_filter :set_user_time_zone


  def show
    @user = current_user
    @microposts = @user.calendars.paginate(:page => params[:page])
    @title = @user.name
  end




  private

  def set_user_time_zone
    logger.debug 'User timezone-----' || current_user.timezone
    Time.zone = current_user.timezone if user_signed_in?

  end

end

