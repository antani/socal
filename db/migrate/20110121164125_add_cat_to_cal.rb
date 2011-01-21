class AddCatToCal < ActiveRecord::Migration
  def self.up
    add_column :calendars, :category_str, :string
  end

  def self.down
  end
end
