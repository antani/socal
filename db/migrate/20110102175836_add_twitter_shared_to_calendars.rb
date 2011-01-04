class AddTwitterSharedToCalendars < ActiveRecord::Migration
  def self.up
    add_column :calendars, :twitter_shared, :boolean, :default=>false
    add_column :calendars, :facebook_shared, :boolean, :default=>false
    add_column :calendars, :foursquare_shared, :boolean, :default=>false
  end

  def self.down
    remove_column :calendars, :twitter_shared
    remove_column :calendars, :facebook_shared
    remove_column :calendars, :foursquare_shared
  end
end

