class User < ActiveRecord::Base
  has_many :calendars
  has_many :authentications
  # Include default devise modules. Others available are:
  # :token_authenticatable, :confirmable, :lockable and :timeoutable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :confirmable,:trackable, :validatable

  # Setup accessible (or protected) attributes for your model
    attr_accessible :email, :password, :password_confirmation, :remember_me, :timezone,:reminder_duration,:share_twitter, :share_facebook,:share_foursquare, :remind_before, :remind_before_what

 # validates_presence_of :remind_before, :remind_before_what, :timezone

  def feed
      Calendar.where("user_id = ?", id)
  end



  def apply_omniauth(omniauth)
    self.email = omniauth['user_info']['email'] if email.blank?
    provider = omniauth['provider']

    if (provider=='twitter' or provider=='facebook' or provider=='foursquare')
        authentications.build(:provider => omniauth['provider'],
                              :uid => omniauth['uid'],
                              :token => omniauth['credentials']['token'],
                              :secret => omniauth['credentials']['secret'])
    else
        authentications.build(:provider => omniauth['provider'],
                              :uid => omniauth['uid'])
    end
  end

  def password_required?
    (authentications.empty? || !password.blank?) && super
  end


end

