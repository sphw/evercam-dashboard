# Copyright (c) 2014-2015, Evercam.io
require "bcrypt"
require "evercam_misc"
require "nokogiri"
require "sequel"
require "timezone"
Sequel::Model.plugin :boolean_readers
Sequel::Model.plugin :association_proxies
Sequel::Model.plugin :timestamps, update_on_create: true
if :postgres == Sequel::Model.db.adapter_scheme
  Sequel::Model.db.extension :pg_array, :pg_json
end
require "evercam_models/access_right"
require "evercam_models/access_right_set"
require "evercam_models/access_token"
require "evercam_models/camera"
require "evercam_models/camera_activity"
require "evercam_models/camera_endpoint"
require "evercam_models/camera_share"
require "evercam_models/camera_share_request"
require "evercam_models/client"
require "evercam_models/country"
require "evercam_models/snapshot"
require "evercam_models/user"
require "evercam_models/add_on"
require "evercam_models/archive"
require "evercam_models/snapshot_report"
require "evercam_models/cloud_recording"
require "evercam_models/motion_detection"
require "evercam_models/vendor"
require "evercam_models/vendor_model"
require "evercam_models/licence"
require "evercam_models/right_sets/account_right_set"
require "evercam_models/right_sets/camera_right_set"
require "evercam_models/right_sets/snapshot_right_set"
require "evercam_models/geocoding"
require "evercam_models/webhook"
module Evercam
end
