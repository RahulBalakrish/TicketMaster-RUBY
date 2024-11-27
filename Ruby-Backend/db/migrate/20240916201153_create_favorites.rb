class CreateFavorites < ActiveRecord::Migration[7.1]
  def change
    create_table :favorites do |t|
      t.references :user, null: false, foreign_key: true
      t.text :events, default: '[]', null: false
      t.text :attractions, default: '[]', null: false

      t.timestamps
    end
  end
end
