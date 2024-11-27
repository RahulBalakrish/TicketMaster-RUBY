class AddTUserIdToFavorites < ActiveRecord::Migration[7.1]
  def change
    remove_reference :favorites, :user, foreign_key: true
    remove_reference :boughts, :user, foreign_key: true
    add_reference :favorites, :t_user, null: false, foreign_key: true
    add_reference :boughts, :t_user, null: false, foreign_key: true
  end
end
