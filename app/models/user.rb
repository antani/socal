class User < ActiveRecord::Base
  has_many :calendars
  has_many :authentications
  # Include default devise modules. Others available are:
  # :token_authenticatable, :confirmable, :lockable and :timeoutable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  # Setup accessible (or protected) attributes for your model
  attr_accessible :email, :password, :password_confirmation, :remember_me, :timezone


   def feed
    # This is preliminary. See Chapter 12 for the full implementation.
    Calendar.where("user_id = ?", id)
  end



  def apply_omniauth(omniauth)
    self.email = omniauth['user_info']['email'] if email.blank?
    authentications.build(:provider => omniauth['provider'],
                          :uid => omniauth['uid'],
                          :token => omniauth['credentials']['token'],
                          :secret => omniauth['credentials']['secret'])
  end

  def password_required?
    (authentications.empty? || !password.blank?) && super
  end


end

