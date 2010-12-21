class RenameLatituteToCalendar < ActiveRecord::Migration
  def self.up
      rename_column :calendars, :latitute, :latitude
  end

  def self.down
  end
end

