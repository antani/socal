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
    logger.debug 'Inside settings.update'
    logger.debug @user.email
    respond_to do |format|
      
      new_pwd = params[:user][:password]
      new_cnf_pwd = params[:user][:password_confirmation]
      curr_pwd = params[:user][:current_password]
      
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
      
      
      #        logger.debug "current password ---------------------"
      #        logger.debug curr_pwd
      #        logger.debug "new password ---------------------"
      #        logger.debug new_pwd
      #        logger.debug "new confirm password ---------------------"
      #        logger.debug new_cnf_pwd
      if params[:user][:which_form] =='password'                                     
        
        if new_pwd.blank? or new_cnf_pwd.blank?                                     
          flash[:error] = "New password or confirmation password is blank" 
          format.html { redirect_to settings_home_url }        
        end                                                                         
        status= @user.update_with_password(:current_password=>curr_pwd,:password=>new_pwd,:password_confirmation =>new_cnf_pwd,:email => @user.email)                
        logger.debug 'Status------------------'
        logger.debug status
        
        if !status                                                                  
          format.html { 
            flash[:error] =  @user.errors.full_messages.to_sentence
            logger.debug @user.errors
            param = 'none'
            @user.errors.each do |key,val|
              param = "user_"+ key.to_s                           
            end
            redirect_to settings_home_url({:param_1 => param })
          }
          logger.debug @user.errors
        elsif @user.save
          flash[:success] = "Password Updated"
          format.html { redirect_to settings_home_url }               	 
        end	                                                                     
        
      else    
        @user.reminder_duration = reminder
        @user.timezone = tz
        @user.share_twitter = st
        @user.share_facebook = sf
        @user.share_foursquare = sff
        @user.remind_before_what = remind_before
        
        if @user.save                                                              
          logger.debug "Settings saved....................................................."
          flash[:success] = "Settings updated"
          format.html { redirect_to settings_home_url }
          format.js
        else
          logger.debug "Settings failed....................................................."
          flash[:error] = "Settings can't be saved"
          format.html { redirect_to settings_home_url }
          format.js
        end                                                                       
      end                                                                           
    end  
  end
  
  def update_other_settings
    logger.debug "Inside update_other_settings..................................................."
  end     
  
end
