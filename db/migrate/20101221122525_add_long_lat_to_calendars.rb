class AddLongLatToCalendars < ActiveRecord::Migration
  def self.up
   # remove_column :calendars, :latitute
    add_column :calendars, :latitude, :float
  end

  def self.down
    remove_column :calendars, :longitude
    remove_column :calendars, :latitute
  end
end

