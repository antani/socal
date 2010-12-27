class AddDoneToCalendar < ActiveRecord::Migration
  def self.up
    add_column :calendars, :done, :boolean, :default=>false
  end

  def self.down
    remove_column :calendars, :done
  end
end

