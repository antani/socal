class Authentication < ActiveRecord::Base
  attr_accessible :user_id, :provider, :uid, :token, :secret
  belongs_to :user

  def provider_name
    if provider == 'open_id'
      "OpenID"
    else
      provider.titleize
    end
  end
end

