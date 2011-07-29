require 'openid/store/filesystem'
Rails.application.config.middleware.use OmniAuth::Builder do
   #Production
   provider :twitter, 'LkNRuATCSidM7rF63NnUYw', '96cdM22QKD5ZeGuI2jv7wYXm7SuT1lBdj2hxWD1kwgA'
   #provider :facebook, '181816611843055', 'eaf9afe8ad70a9626dfd488ec882c237',{:scope =>"publish_stream,user_likes,friends_likes,email,offline_access"}
   provider :open_id, nil
     use OmniAuth::Strategies::OpenID, nil, :name => "yahoo", :identifier => "https://me.yahoo.com"
     use OmniAuth::Strategies::OpenID, nil, :name => "google", :identifier => 'https://www.google.com/accounts/o8/id'
   
   provider :foursquare, 'X41NC314YUNA32IDY4TI0VHWYOWQEYX1IKPPYC0XAVHKYHGD', 'VYWPGJSQ5UOJQYR0FK2LF3SG3SEKR0WJ1OQ3E1IKK1NNA2KZ'
   #provider :facebook, '140372859359450', '05b749ae51632bdbea0d08b3aed2b979',{:scope =>"publish_stream,user_likes,friends_likes,email,offline_access,publish_checkins"}

   #provider :facebook, '137278183009836','97d6f3e1ce394c8aa4f6e98cba305d85', {:scope =>"publish_stream,user_likes,friends_likes,email,offline_access,publish_checkins"}

   #Development key

   # provider :twitter, 'vm1CDPRNqXHXseMnUKHxDA', 'O08Pt86u7n8mNhWdT78ODCAxm8UJjEJEyOkF6rPho'
   #provider :facebook, '139636279427129', '66c2c368cb6b472e5dcf71407353261e',{:scope =>"publish_stream,user_likes,friends_likes,email,offline_access,publish_checkins" }
   provider :facebook, '224021050974767', '82713bc4a70eccec350986144f8a300e',{:scope =>"publish_stream,user_likes,friends_likes,email,offline_access,publish_checkins" }
   
   
    #provider :open_id, OpenID::Store::Filesystem.new('/tmp')
    #  use OmniAuth::Strategies::OpenID, OpenID::Store::Filesystem.new('/tmp'), :name => 'yahoo', :identifier => 'yahoo.com'
    #  use OmniAuth::Strategies::OpenID, OpenID::Store::Filesystem.new('/tmp'), :name => 'google', :identifier => 'https://www.google.com/accounts/o8/id'





   #   provider :gowalla, 'd0daf476bcad498e845aac0e57d384cf', 'cd26140f06d748abad0c7b6d87ee7fd2'
#    provider :google_apps, OmniAuth::Strategies::GoogleApps, OpenID::Store::Filesystem.new('/tmp')
  #  provider :open_id, OpenID::Store::Filesystem.new('/tmp'), {:name => "google", :domain => "https://www.google.com/accounts/o8/id" }
  #  provider :open_id, OpenID::Store::Filesystem.new('/tmp'), {:name => "yahoo", :domain => "https://me.yahoo.com"}


end

