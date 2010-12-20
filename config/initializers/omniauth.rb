require 'openid/store/filesystem'
Rails.application.config.middleware.use OmniAuth::Builder do
   #Development key
   #provider :twitter, 'vm1CDPRNqXHXseMnUKHxDA', 'O08Pt86u7n8mNhWdT78ODCAxm8UJjEJEyOkF6rPho'
   provider :facebook, '146622722052799', '60082246962cc913f932e2ed2854c30d'
   provider :open_id, OpenID::Store::Filesystem.new('/tmp')
   #Production
   provider :twitter, 'LkNRuATCSidM7rF63NnUYw', '96cdM22QKD5ZeGuI2jv7wYXm7SuT1lBdj2hxWD1kwgA'

end

