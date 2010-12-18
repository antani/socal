class AddWhenDateToCalendar < ActiveRecord::Migration
  def self.up
    add_column :calendars, :whendate, :date
  end

  def self.down
    remove_column :calendars, :whendate
  end
end
