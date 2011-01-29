class PagesController < ApplicationController
  before_filter :authenticate_user!, :except => [:home, :contact]
  before_filter :set_user_time_zone
  
  def home

     if current_user
       #logger.debug list_venues(12.9566921,77.6407258,current_user).to_yaml
       #@search
       @search=@user.calendars.search(params[:search])
         logger.debug "Searching with...................."
         logger.debug params[:search]
       
       if params[:search]
         @search=@user.calendars.search(params[:search])
         @search_result = @search.paginate(:page => params[:page])
       end
       @user = User.find(current_user.id)
       @calendar = Calendar.new if user_signed_in?
       @feed_items = @user.calendars.all.paginate(:page => params[:page])
       @feed_items_last_week = @user.calendars.where("whendate<?",(Time.now.to_date)).paginate(:page => params[:page])
       @feed_items_future = @user.calendars.where(:whendate => (Date.today+2.days)..(Date.today+1.year)).paginate(:page => params[:page])
       @feed_items_today = @user.calendars.where( :whendate => Date.today).paginate(:page => params[:page])
       @feed_items_tomorrow = @user.calendars.where( :whendate => Date.today+1).paginate(:page => params[:page])
       @title = @user.email
      end
  end
  def contact
    @title= "Contact"
  end
  def set_user_time_zone
    if current_user
      @user = User.find(current_user.id)
      Time.zone = @user.timezone if user_signed_in?
      logger.debug "Timezone -- " || Time.zone 
    end  
  end
end

