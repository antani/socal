class Calendar < ActiveRecord::Base
  belongs_to :user

  #Validation
  validates :event, :presence => true, :length => {:maximum => 140}


   # Default sort order
  default_scope :order => 'calendars.created_at DESC'

end

