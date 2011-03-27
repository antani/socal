class ModifyCalendarsSync < ActiveRecord::Migration
  def self.up
    change_column :calendars, :sync, :string, :default=>"false"
  end

  def self.down
  end
end
