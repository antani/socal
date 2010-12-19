class Calendar < ActiveRecord::Base
  belongs_to :user
  attr_accessible :event, :where, :when, :whendate
  #Validation
  validates :event, :presence => true, :length => {:maximum => 140}


   # Default sort order
  #default_scope :order => '"calendars.when desc"'
end

