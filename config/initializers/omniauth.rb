require 'openid/store/filesystem'
Rails.application.config.middleware.use OmniAuth::Builder do
   #Production
   provider :twitter, 'LkNRuATCSidM7rF63NnUYw', '96cdM22QKD5ZeGuI2jv7wYXm7SuT1lBdj2hxWD1kwgA'
   provider :facebook, '181816611843055', 'eaf9afe8ad70a9626dfd488ec882c237',{:scope =>"publish_stream,user_likes,friends_likes,email,offline_access"}
 #  provider :foursquare, 'Q00C0YHNLKLGGKLK2ZLLWY2YDPWDTZ2DSYJ1G2BQ1NAAL542', 'HAOZ1JEHPHKLNHFXUG5ZUGQJM3BVJ10OAJC5QUOFGJCOHH0V'
   provider :open_id, nil
     use OmniAuth::Strategies::OpenID, nil, :name => 'yahoo', :identifier => 'yahoo.com'
     use OmniAuth::Strategies::OpenID, nil, :name => 'google', :identifier => 'https://www.google.com/accounts/o8/id'

   #Development key
   # provider :twitter, 'vm1CDPRNqXHXseMnUKHxDA', 'O08Pt86u7n8mNhWdT78ODCAxm8UJjEJEyOkF6rPho'
   # provider :facebook, '139636279427129', '66c2c368cb6b472e5dcf71407353261e',{:scope =>"publish_stream,user_likes,friends_likes,email,offline_access"}
    #provider :open_id, OpenID::Store::Filesystem.new('/tmp')
    #  use OmniAuth::Strategies::OpenID, OpenID::Store::Filesystem.new('/tmp'), :name => 'yahoo', :identifier => 'yahoo.com'
    #  use OmniAuth::Strategies::OpenID, OpenID::Store::Filesystem.new('/tmp'), :name => 'google', :identifier => 'https://www.google.com/accounts/o8/id'





   provider :foursquare, 'X41NC314YUNA32IDY4TI0VHWYOWQEYX1IKPPYC0XAVHKYHGD', 'VYWPGJSQ5UOJQYR0FK2LF3SG3SEKR0WJ1OQ3E1IKK1NNA2KZ'
#   provider :gowalla, 'd0daf476bcad498e845aac0e57d384cf', 'cd26140f06d748abad0c7b6d87ee7fd2'
#    provider :google_apps, OmniAuth::Strategies::GoogleApps, OpenID::Store::Filesystem.new('/tmp')
  #  provider :open_id, OpenID::Store::Filesystem.new('/tmp'), {:name => "google", :domain => "https://www.google.com/accounts/o8/id" }
  #  provider :open_id, OpenID::Store::Filesystem.new('/tmp'), {:name => "yahoo", :domain => "https://me.yahoo.com"}


end

