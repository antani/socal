class Renamenameoncategory < ActiveRecord::Migration
  def self.up
    rename_column :categories, :name, :cat_name
  end

  def self.down
  end
end
