class PagesController < ApplicationController
  before_filter :authenticate_user!, :except => [:home, :contact]

  def home

     if current_user
       @user = User.find(current_user.id)
       @calendar = Calendar.new if user_signed_in?
       @feed_items = @user.calendars.all.paginate(:page => params[:page])
       @feed_items_last_week = @user.calendars.where("whendate<?",(Time.now.to_date)).paginate(:page => params[:page])
       @feed_items_future = @user.calendars.where(:when => (Time.now+2.days)..(Time.now.midnight+1.year)).paginate(:page => params[:page])
       @feed_items_today = @user.calendars.where( :whendate => Date.today).paginate(:page => params[:page])
       @feed_items_tomorrow = @user.calendars.where( :whendate => Date.today+1).paginate(:page => params[:page])
       @title = @user.email
      end
  end
  def contact
    @title= "Contact"
  end

end

