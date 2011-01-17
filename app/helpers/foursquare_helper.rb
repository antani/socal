require 'foursquare'


module FoursquareHelper

  FOURSQUARE_OAUTH_KEY='X41NC314YUNA32IDY4TI0VHWYOWQEYX1IKPPYC0XAVHKYHGD'
  FOURSQUARE_OAUTH_SECRET='VYWPGJSQ5UOJQYR0FK2LF3SG3SEKR0WJ1OQ3E1IKK1NNA2KZ'
  BASE_URL = 'http://api.foursquare.com/v2'
  FORMAT = 'json'

  #-------------------------------------------Foursquare helper methods - Start

  def list_friends
  end
  
  def list_user
  end
  
  def checkin(user,calendar)
   
  end
  
  def list_checkins
  end

  def list_venues(lat,lon,user)
    auths=user.authentications.find(:first, :conditions => { :provider => 'foursquare' })
    venue=Foursquare :: Venue.new(auths.token)
    x = venue.search({:ll => "#{lat},#{lon}"}).to_yaml  
    logger.debug x
  end

  def create_foursqare_client(user)
    auths=user.authentications.find(:first, :conditions => { :provider => 'foursquare' })
    oauth = Foursquare::OAuth.new(FOURSQUARE_OAUTH_KEY, FOURSQUARE_OAUTH_SECRET)
    oauth.authorize_from_access(auths.token, auths.secret)
    @foursquare = Foursquare::Base.new(oauth)
  end

  #-------------------------------------------Foursquare helper methods - end


end

