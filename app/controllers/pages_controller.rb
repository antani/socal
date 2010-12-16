class PagesController < ApplicationController
  before_filter :authenticate_user!, :except => [:home, :contact]
  def home
     @title = "Home"
     if current_user
       @user = User.find(current_user.id)
       #Listing 11.18 -
       #@microposts = @user.microposts.paginate(:page => params[:page])
       #results in - https://github.com/mislav/will_paginate/issuesearch?state=closed&q=ActiveRecord%3A%3ACalculations%3A%3ACALCULATIONS_OPTIONS#issue/91
       #Need to fix it to :
       @calendar = Calendar.new if user_signed_in?
       @feed_items = @user.calendars.all.paginate(:page => params[:page])
       @feed_items_last_week = @user.calendars.where(:when => (Time.now.midnight - 7.day)..Time.now.midnight).paginate(:page => params[:page])
       @feed_items_future = @user.calendars.where(:when => (Time.now.midnight)..(Time.now.midnight+1.year)).paginate(:page => params[:page])
       @feed_items_today = @user.calendars.where( :when => ( Time.now..Time.now.midnight)).paginate(:page => params[:page])
       @title = @user.email
      end
  end
  def contact
    @title= "Contact"
  end

end

