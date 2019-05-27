class CreateUsers < ActiveRecord::Migration[5.0]
  def change
    create_table :users do |t|

      t.string :name,               null: false, unique: true, index: true
      t.string :mail,               null: false, default: ""
      t.string :encrypted_password, null: false, default: ""
      t.timestamps
    end
  end
end
