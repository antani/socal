class AddSyncToCalendar < ActiveRecord::Migration
  def self.up
    add_column :calendars, :sync, :boolean, :default=>false

  end

  def self.down
    remove_column :calendars, :sync
  end
end

