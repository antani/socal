class AddShareTwitterToUser < ActiveRecord::Migration
  def self.up
    add_column :users, :share_twitter, :boolean, :default=>false
    add_column :users, :share_facebook, :boolean, :default=>false
    add_column :users, :share_foursquare, :boolean, :default=>false
  end

  def self.down
  end
end
