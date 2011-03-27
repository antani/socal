class AddGCalIdToCalendar < ActiveRecord::Migration
  def self.up
    add_column :calendars, :gcal_id, :string
  end

  def self.down
  end
end
