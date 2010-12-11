class ApplicationController < ActionController::Base
  protect_from_forgery

  def show
    @user = current_user
    @microposts = @user.calendars.paginate(:page => params[:page])
    @title = @user.name
  end
end

