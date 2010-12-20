class AddImportantToCalendars < ActiveRecord::Migration
  def self.up
    add_column :calendars, :important, :boolean, :default => false
  end

  def self.down
    remove_column :calendars, :important
  end
end

