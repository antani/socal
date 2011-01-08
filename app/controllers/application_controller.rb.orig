class ApplicationController < ActionController::Base
  protect_from_forgery
  before_filter :set_user_time_zone


  def show
    @user = current_user
    @microposts = @user.calendars.paginate(:page => params[:page])
    @title = @user.name
  end

  def setup_google
    logger.debug "Start google_calendar_noise"
    @client = GData::Client::Calendar.new
    #@client = GData::Client::Calendar.new
    if params[:token].nil? and session[:token].nil?
      #next_url = url_for :controller => self.controller_name, :action => 'fetch_feed' #self.action_name
      next_url = url_for :controller => 'g_data', :action => 'index'
      logger.debug "1. google_calendar_noise #{@next_url}"
      logger.debug self.controller_name
      logger.debug self.action_name
      secure = false
      @authsub_link = @client.authsub_url(next_url, secure, true)
      #@authsub_link = GData::Auth::AuthSub.get_url(next_url, scope, secure, true)
      logger.debug @authsub_link
      redirect_to @authsub_link
      #render :controller => 'calendars', :action => 'fetch_feed'
      logger.debug "Back from google"
      #logger.debug params[:token]
    elsif params[:token] and session[:token].nil?
        @client.authsub_token = params[:token]
        session[:token] = @client.auth_handler.upgrade()
    end
    @client.authsub_token = session[:token] if session[:token]

  end

<<<<<<< HEAD
=======
  ActionView::Base.field_error_proc = Proc.new do |html_tag, instance|

    if html_tag.include? "label for"
        if instance.error_message.kind_of?(Array)
          %(#{html_tag}<span class="validation-error">&nbsp;#{instance.error_message.join(',')}</span>).html_safe
        else
          %(#{html_tag}<span class="validation-error">&nbsp;#{instance.error_message}</span>).html_safe
        end
    else
        %(<div class='errored'>#{html_tag}</div>).html_safe
    end

end

>>>>>>> css-changes
  private

  def set_user_time_zone
    logger.debug 'User timezone-----' || current_user.timezone
    Time.zone = current_user.timezone if user_signed_in?

  end

end

