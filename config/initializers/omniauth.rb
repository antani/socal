require 'openid/store/filesystem'
Rails.application.config.middleware.use OmniAuth::Builder do
   #Production
   provider :twitter, 'LkNRuATCSidM7rF63NnUYw', '96cdM22QKD5ZeGuI2jv7wYXm7SuT1lBdj2hxWD1kwgA'
   provider :facebook, '186287734721301', '8e54e8433363b98d59457fe42118fe5c',{:scope =>"publish_stream,user_likes,friends_likes,email,offline_access"}
   #Development key
#   provider :twitter, 'vm1CDPRNqXHXseMnUKHxDA', 'O08Pt86u7n8mNhWdT78ODCAxm8UJjEJEyOkF6rPho'
#   provider :facebook, '146622722052799', '60082246962cc913f932e2ed2854c30d'
#   provider :open_id, OpenID::Store::Filesystem.new('/tmp')
#   provider :foursquare, 'X41NC314YUNA32IDY4TI0VHWYOWQEYX1IKPPYC0XAVHKYHGD', 'VYWPGJSQ5UOJQYR0FK2LF3SG3SEKR0WJ1OQ3E1IKK1NNA2KZ'
#   provider :gowalla, 'd0daf476bcad498e845aac0e57d384cf', 'cd26140f06d748abad0c7b6d87ee7fd2'

end

