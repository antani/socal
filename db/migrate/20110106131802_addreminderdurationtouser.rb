class Addreminderdurationtouser < ActiveRecord::Migration
  def self.up
    add_column :users, :reminder_duration, :integer, :default => 10
  end

  def self.down
    remove_column :users, :reminder_duration
  end
end

