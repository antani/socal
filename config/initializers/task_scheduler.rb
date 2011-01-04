require 'rufus/scheduler'
require 'twitter'
require 'gdata'
require 'foursquare'

  FOURSQUARE_OAUTH_KEY='X41NC314YUNA32IDY4TI0VHWYOWQEYX1IKPPYC0XAVHKYHGD'
  FOURSQUARE_OAUTH_SECRET='VYWPGJSQ5UOJQYR0FK2LF3SG3SEKR0WJ1OQ3E1IKK1NNA2KZ'
  BASE_URL = 'http://api.foursquare.com/v2'
  FORMAT = 'json'

scheduler = Rufus::Scheduler.start_new

scheduler.every("1m") do
   noise
end

   def noise
    Rails.logger.debug "Starting to create noise---------------------------------------------------------------"
    #Find all calendars that have 'when' = now.
    @mail_calendar = Calendar.where(:when => (Time.now+5.minutes)..(Time.now+6.minutes))
    @mail_calendar.each do |c|
      UserMailer.registration_confirmation(c.user,c).deliver
      twitter_noise(c.user,c)
      facebook_noise(c.user,c)
      foursquare_noise(c.user,c)
    end
    Rails.logger.debug "Noised---------------------------------------------------------------------------------"
   end

  def foursquare_noise(user,calendar)
    Rails.logger.debug "Starting to create foursquare noise----------------------------------------------------"
    #@foursquare.venues(calendar.latitude, calendar.longitude)
    checkin(user,calendar)
    calendar.foursquare_shared =true
    calendar.save
  end


  def twitter_noise(user,calendar)
    Rails.logger.debug "Starting to create twitter noise-------------------------------------------------------"
    auth = user.authentications.find(:first, :conditions => { :provider => 'twitter' })
    Rails.logger.debug auth
    if auth
        Rails.logger.debug auth.provider
        Rails.logger.debug auth.uid
        Rails.logger.debug auth.token
        Rails.logger.debug auth.secret

        Twitter.configure do |config|
          #config.consumer_key = 'vm1CDPRNqXHXseMnUKHxDA'
          #config.consumer_secret = 'O08Pt86u7n8mNhWdT78ODCAxm8UJjEJEyOkF6rPho'
          config.consumer_key = 'LkNRuATCSidM7rF63NnUYw'
          config.consumer_secret = '96cdM22QKD5ZeGuI2jv7wYXm7SuT1lBdj2hxWD1kwgA'
          config.oauth_token = auth.token
          config.oauth_token_secret = auth.secret
        end
    #    @client ||= Twitter::Client.new
        Twitter.update("From Socal -" + calendar.event)
        calendar.twitter_shared =true
        calendar.save

    end
  end

  def facebook_noise(user,calendar)
    Rails.logger.debug "Starting to create facebook_noise noise-------------------------------------------------------"
    auth = user.authentications.find(:first, :conditions => { :provider => 'facebook' })
    Rails.logger.debug auth
    if auth
        Rails.logger.debug "Auth-token for fb :"
        Rails.logger.debug auth.token
        Rails.logger.debug "--------------------"
        graph = Koala::Facebook::GraphAPI.new(auth.token)
        profile = graph.get_object("me")

        #friends = graph.get_connections("me", "friends")
        #graph.put_object("me", "feed", :message => "From Socal")
        id=graph.put_wall_post("is.." + calendar.event)
        if id
          calendar.facebook_shared =true
          calendar.save
        end


    end
  end
  #-------------------------------------------Foursquare helper methods - Start

  def list_friends
    create_foursqare_client
    @foursquare.friends
  end
  def list_user
    create_foursqare_client
    @foursquare.user
  end
  def checkin(user,calendar)
   create_foursqare_client(user)
   near_places = list_venues(calendar.latitude, calendar.longitude, user)
   venue_id=0
   near_places.each do |key,value|
       # Rails.logger.debug "checkin ----------------------------------------------------------"
       # Rails.logger.debug key.downcase
       # Rails.logger.debug calendar.where.downcase
       # Rails.logger.debug "checkin ----------------------------------------------------------"

     if calendar.where.downcase.include? key.downcase
      # Rails.logger.debug "Found the exact venue"
       venue_id = value
      # Rails.logger.debug venue_id
     end
   end
   #there was no exact match
   if venue_id == 0
 #    Rails.logger.debug "There was no exact match trying the frist location"
     near_places.first.each do |key,value|
 #      Rails.logger.debug value
       venue_id = value
     end
   end
    options = {
    :vid => venue_id,
    :shout => calendar.event,
    :venue => calendar.where,
    :private => 0,
    :twitter => 0,
    :geolat => calendar.latitude,
    :geolong => calendar.longitude}
    @foursquare.checkin(options)
  end
  def list_checkins
    create_foursqare_client
    @foursquare.checkins :geolat => 12.9715987, :geolong => 77.5945627
  end

  def list_venues(lat,lon,user)
    create_foursqare_client(user)
    response=@foursquare.venues :geolat => lat, :geolong => lon
    places = Hash.new
    #logger.debug response.to_yaml
    begin
      response["groups"].find {|h| h["type"] == "Nearby"}["venues"].each do |key|
       # Rails.logger.debug key['name']
        places[key['name']]= key['id']
      end
      response["groups"].find {|h| h["type"] == "My Favorites"}["venues"].each do |key|
       # Rails.logger.debug key['name']
        places[key['name']]= key['id']
      end
    rescue
    end
    places
    #logger.debug response
    #response["groups"]["Nearby"]["venues"].each do |key|
    #  logger.debug key
   # end
  end

  def create_foursqare_client(user)
    auths=user.authentications.find(:first, :conditions => { :provider => 'foursquare' })
    oauth = Foursquare::OAuth.new(FOURSQUARE_OAUTH_KEY, FOURSQUARE_OAUTH_SECRET)
    oauth.authorize_from_access(auths.token, auths.secret)
    @foursquare = Foursquare::Base.new(oauth)
  end


  #-------------------------------------------Foursquare helper methods - end

