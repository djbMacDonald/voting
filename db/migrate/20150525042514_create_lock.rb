class CreateLock < ActiveRecord::Migration
  def change
    create_table :locks do |t|
      t.boolean :status, default: false
    end
  end
end
