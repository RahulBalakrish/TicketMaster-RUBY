class AddSubscriptionIdToUsers < ActiveRecord::Migration[7.1]
  def change
    add_column :t_users, :subscription_id, :string
  end
end
