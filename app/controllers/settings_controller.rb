class SettingsController < ApplicationController
  def index
    @user = current_user
  end
  def home
    @user = current_user
  end
  def create
    logger.debug 'Inisde settings.create'
    update

  end
  # GET /calendars/1/edit
  def edit
    @user = current_user
  end

  def update
    @user = current_user
    logger.debug 'Inisde settings.update'
    logger.debug @user.email
    respond_to do |format|
        new_pwd = params[:user][:password]
        new_cnf_pwd = params[:user][:password_confirmation]
        reminder = params[:user][:reminder_duration]
        tz = params[:user][:timezone]
        remind_before = params[:reminder_before_what]
        if params[:share_twitter] != nil
          st = true
        else
          st =false
        end
        if params[:share_facebook] != nil
          sf = true
        else
          sf =false
        end
        if params[:share_foursquare] != nil
          sff = true
        else
          sff =false
        end

        @user.password = new_pwd
        @user.password_confirmation = new_cnf_pwd
        @user.reminder_duration = reminder
        @user.timezone = tz
        @user.share_twitter = st
        @user.share_facebook = sf
        @user.share_foursquare = sff
        @user.remind_before_what = remind_before
        if @user.save
           logger.debug "Settings saved....................................................."
           #flash[:success] = "Settings updated"
           format.html { redirect_to settings_home_url }
           format.js

       else
           logger.debug "Settings failed....................................................."
           flash[:error] = "Settings cant be saved"
           format.html { redirect_to settings_home_url }
           format.js

        end
   end
  end
end

