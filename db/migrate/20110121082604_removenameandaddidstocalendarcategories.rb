class Removenameandaddidstocalendarcategories < ActiveRecord::Migration
  def self.up
     remove_column :calendar_categories, :name
    add_column :calendar_categories, :calendar_id, :integer
    add_column :calendar_categories, :category_id, :integer    
  end

  def self.down
  end
end
